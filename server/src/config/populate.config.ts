// исключение пароля и __v  из объекта пользователя
export const SELECT_PARAMS = '-password -__v';

// исключения при получении пользователя, как вложенного объекта
export const USER_EXCLUDING_FIELDS =
  '-friends -subscribers -subscriptions -password -email -createdAt -updatedAt -__v -profileBackground -photos';

// исключения полей пользователя при получении пользователя, как вложенного объекта
export const USER_PATHS_FOR_EXCLUDING_FIELDS =
  'subscribers subscriptions friends';
