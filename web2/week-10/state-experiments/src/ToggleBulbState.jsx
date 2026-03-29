import { useContext } from "react";
import { BulbContext } from "./BulbProvider.jsx";

function ToggleBulbState() {
    const { setBulbOn } = useContext(BulbContext);
    return (
        <button onClick={()=>setBulbOn(currentState => !currentState)}>Toggle bulb</button>
    )
}

export default ToggleBulbState;