import React, { useState } from "react"

export default function WaitingScene(){
    const phrases = [
        "Chargement des décors",
        "Toubonobo se prépare",
        "Toubonobo enfile un T-shirt, son pantalon",
        "Oups, il avait oublié son caleçon 🤭",
        "Ta connexion est sans doute un peu lente, attends encore un peu 😬"
    ];
    const [phrase, setPhrase] = useState<number>(0);

   setTimeout(()=>{
        if(phrase <4){
            setPhrase(phrase+1);
        }
    }, 3000);

    function renderPhrase(t: string, index: number){
        return (
        <div>
            {
                index < phrase ?
                 <span>{t} ✔️</span>
                 :
                 <span>{t}...</span>
            }
        </div>
       )
    }

    return (
        <>
            {
                phrases.filter((_phrase, index) => index <= phrase).map((t, index) => renderPhrase(t, index))
            }
        </>
    )
}