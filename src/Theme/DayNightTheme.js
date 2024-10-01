import { createContext, useState, useContext } from "react";

export const ThemeContext = createContext();

const ThemeChanger = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    const toggleTheme = () => {
        const updatedTheme = theme == 'dark' ? 'light' : 'dark';
        setTheme(updatedTheme);
    }
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
    );
}


export default ThemeChanger;

export const useTheme = () => {
    return useContext(ThemeContext);

}