import { useState } from "react"
const useFormInput = (initialtext) => {
    const [text, settext] = useState(initialtext)
    const texthandler = (e) => {
        settext(e.target.value)
    }
    const cleartext = () => {
        settext('')
    }
    return {
        value: text,
        onChange: texthandler,
        cleartext
    }
}
export default (useFormInput)