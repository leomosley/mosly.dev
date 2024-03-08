'use client';
import React, { useState, useEffect } from 'react';

interface Command {
  prompt: string;
  response: string;
}

interface Props {
  previousCommands: Command[];
  setPreviousCommands: React.Dispatch<React.SetStateAction<Command[]>>;
  currentPath: string;
  previousPaths: string[];
}

export default function CommandLineOutput({
  previousCommands,
  setPreviousCommands,
  currentPath,
  previousPaths
} : Props) {
  const [displayedResponses, setDisplayedResponses] = useState<string[]>([]);

  useEffect(() => {
    const updateDisplayedResponses = () => {
      previousCommands.forEach((command, index) => {
        const characters = command.response.split('');
        let currentResponse = '';
        
        characters.forEach((char, charIndex) => {
          setTimeout(() => {
            currentResponse += char;
            setDisplayedResponses(prev => {
              const newResponses = [...prev];
              newResponses[index] = currentResponse;
              return newResponses;
            });
          }, charIndex * 3);
        });
      });
    };

    updateDisplayedResponses();
  }, [previousCommands]);

  return (
    <div className="flex flex-col">
      {previousCommands.map((command, index) => (
        <>
        <div className="flex flex-row">
          <span 
            className="text-green-500 glow"
          >user@leomosley.com:{previousPaths[index]}$&nbsp;</span>
          <span 
            className="text-teal-100 glow"
          >{command.prompt}</span>
        </div>
        <pre className="glow text-purple transition duration-1000 ease-in">
          {index === (previousCommands.length-1)?
            displayedResponses[index] : command.response
          }
        </pre>
        </>
      ))}
    </div>
  );
}
