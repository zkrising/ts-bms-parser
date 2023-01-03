# Typescript BMS Parser

This small library (0 sloc) is a BMS parser written in TypeScript.

![](https://cdn.discordapp.com/attachments/701306166772367386/1059687223383035924/image.png)

# Usage

```ts
type ParsedGengaozo = ParseBMS<`*---------------------- HEADER FIELD

#PLAYER 1
#GENRE P s y
#TITLE G e n g a o z o
#ARTIST 455-38B / 29
#BPM 153
#PLAYLEVEL -45
#RANK 3
#TOTAL 300
#VOLWAV 100
#STAGEFILE
`>;

// ParsedGengaozo ->
// {
//     PLAYER: "1";
//     GENRE: "P s y";
//     TITLE: "G e n g a o z o _ F U C";
//     ARTIST: "455-38B / 29";
//     BPM: "153";
//     PLAYLEVEL: "-45";
//     RANK: "3";
//     TOTAL: "300";
//     VOLWAV: "100";
// }
}
```

# Problems

Yes.

# Why?

BMS.
