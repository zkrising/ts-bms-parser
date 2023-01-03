/* eslint-disable @typescript-eslint/ban-types */
// It's always a good start to a file when "ban-types" is globally turned off.
// have fun!

/* eslint-disable lines-around-comment */

type LowercaseAlpha =
	| "a"
	| "b"
	| "c"
	| "d"
	| "e"
	| "f"
	| "g"
	| "h"
	| "i"
	| "j"
	| "k"
	| "l"
	| "m"
	| "n"
	| "o"
	| "p"
	| "q"
	| "r"
	| "s"
	| "t"
	| "u"
	| "v"
	| "w"
	| "x"
	| "y"
	| "z";

export type AtoZ = LowercaseAlpha | Uppercase<LowercaseAlpha>;

export type Num = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type Alphanumeric = AtoZ | Num;

export type Whitespace = " " | "\n" | "\r" | "\t";

export type Newline = "\n" | "\r\n";

export interface Err<Msg> {
	message: Msg;
}

/**
 * Skip all whitespace (space, \n, \t, \r) until we get to the character
 * then return the rest of the string including that char.
 *
 * Chomp<"    { foo }", "{"> = "{ foo }"
 */
export type Chomp<
	Input extends string,
	Char extends string
> = Input extends `${Whitespace}${infer Content}`
	? Chomp<Content, Char>
	: Input extends `${Char}${infer _}`
	? Input
	: Input extends `${infer UnexpectedChar}${infer _}`
	? Err<`Unexpected character '${UnexpectedChar}' while reading for '${Char}'.`>
	: Err<`Unexpected end of input while reading for '${Char}'.`>;

/**
 * Skip all whitespace until the next newline character. If no newline character exists
 * and this is the final line in the file, return the empty string.
 */
export type SkipUntilNewline<Input extends string> =
	Input extends `${infer _}${Newline}${infer Content}` ? Content : "";

type IterateLines<
	Input extends string,
	Output = {}
> = Input extends `${infer Content}${Newline}${infer NextInput}`
	? IterateLines<NextInput, Output & ParseBMSLine<Content>>
	: Output & ParseBMSLine<Input>;

type ParseBMSLine<Input extends string> = Input extends `#${infer Content}${
	| " "
	| "\t"}${infer Value}`
	? { [C in Content]: Chomp<Value, Alphanumeric | "_" | "-"> }
	: {};

/**
 * Parse a BMS file.
 *
 * @example ParseBMS<"bms file contents here">;
 */
export type ParseBMS<Input extends string> = {
	// clean up how the types are displayed a bit (at the massive cost of performance)
	// by double parsing. lol
	[K in keyof IterateLines<Input>]: IterateLines<Input>[K];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Example = ParseBMS<`*---------------------- HEADER FIELD

#PLAYER 1
#GENRE P s y
#TITLE G e n g a o z o
#ARTIST 455-38B / 29
#BPM 153
#PLAYLEVEL     -45
#RANK\t3
#TOTAL 300
#VOLWAV 100
#STAGEFILE
`>;
