
export const VOICE=  {
    INTRODUCE : 'introduce_self',
    FREIND : 'freind',
    BOOK_OR_MOVIE : 'book_or_movie',
    RESPECT_PERSON : 'respect_person',
}

type VOICE = typeof VOICE[keyof typeof VOICE]; 
