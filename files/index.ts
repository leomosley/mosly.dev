export interface FileObject {
  [key: string]: {filename: string; content: string; extension: string}[]
}

export const files: FileObject = {
  "~": [
    {
      filename: "parrot.md", 
      content:`
                               .cccc;;cc;';c.           
                      .,:dkdc:;;:c:,:d:.          
                     .loc'.,cc::c:::,..;:.        
                   .cl;....;dkdccc::,...c;        
                  .c:,';:'..ckc',;::;....;c.      
                .c:'.,dkkoc:ok:;llllc,,c,';:.     
               .;c,';okkkkkkkk:;lllll,:kd;.;:,.   
               co..:kkkkkkkkkk:;llllc':kkc..oNc   
             .cl;.,oxkkkkkkkkkc,:cll;,okkc'.cO;   
             ;k:..ckkkkkkkkkkkl..,;,.;xkko:',l'   
            .,...';dkkkkkkkkkkd;.....ckkkl'.cO;   
         .,,:,.;oo:ckkkkkkkkkkkdoc;;cdkkkc..cd,   
      .cclo;,ccdkkl;llccdkkkkkkkkkkkkkkkd,.c;     
     .lol:;;okkkkkxooc::coodkkkkkkkkkkkko'.oc     
   .c:'..lkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkd,.oc     
  .lo;,:cdkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkd,.c;     
,dx:..;lllllllllllllllllllllllllllllllllc'...     
cNO;........................................   
      `,
      extension: ".md"
    }
  ],
  "/about": [
    {
      filename: "about.md", 
      content:"", 
      extension: ".md"
    }
  ],
  "/projects": [],
  "/projects/project1": [
    {
      filename: "project.md", 
      content:"", 
      extension: ".md"}
  ],
  "/contact": [
    {
      filename: "contact.md", 
      content:"", 
      extension: ".md"}
  ],
}