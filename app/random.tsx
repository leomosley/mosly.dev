'use client';
import React, { useEffect, useState } from 'react';
import * as HeroIcons from 'react-icons/hi';
import { FaDeleteLeft } from 'react-icons/fa6';

interface IconCollection {
  [key: string]: React.ComponentType;
}

export default function Home() {
  const iconCollection = HeroIcons as IconCollection;
  const allIconKeys = Object.keys(iconCollection);

  const [iconsMap, setIconsMap] = useState<string[] | undefined>();
  const [buttonIcons, setButtonIcons] = useState<string[] | undefined>();
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [showCorrect, setShowCorrect] = useState<boolean>(true);
  
  useEffect(() => {
    let tempIconsMap = [...Array(9)].map((v, i) => (
      allIconKeys[Math.floor(Math.random() * allIconKeys.length)]
    ));
    let tempButtonIcons = Array.from(new Set(tempIconsMap)).toSorted();

    setIconsMap(tempIconsMap);
    setButtonIcons(tempButtonIcons);

    setTimeout(() => {
      setShowCorrect(false);
    }, 4000);
  }, [iconCollection]);
  
    
  const handleButtonClick = (icon: string) => {
    console.log(icon);
  }

  return (
    <main className="flex justify-center items-center p-4">
      <div className="grid grid-cols-3 gap-2 p-4 bg-slate-700 rounded-3xl">
        {iconsMap && iconsMap.map((icon, index) => {
          const RandomIcon = iconCollection[icon];
          return (
            <div className="w-16 h-16 bg-slate-600" key={index}>
              {showCorrect && <RandomIcon />}
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 bg-slate-700 p-1 rounded-t-lg">
        {buttonIcons && buttonIcons.map((icon, index) => {
            const ButtonIcon = iconCollection[icon];
            return (
              <button 
              className="mx-0.5 xs:mx-1 text-lg xs:text-xl sm:text-3xl lg:text-4xl p-0.5 xs:p-1 xl:p-2 
                       text-slate-300 align-middle"  
              key={index}
              onClick={() => handleButtonClick(icon)}
              >
                <ButtonIcon />
              </button>
            );
        })}
        <button
          className="mx-0.5 xs:mx-1 text-m xs:text-xl sm:text-3xl lg:text-4xl p-0.5 xs:p-1 xl:p-2
                  text-slate-300 border-l border-solid border-slate-800 align-middle"
          onClick={() => setSelectedIcons((prev) => 
            (prev.length > 0)? prev.slice(0, -1) : prev
          )}
        >
          <FaDeleteLeft />
        </button>
      </div>
    </main>
  );
}
