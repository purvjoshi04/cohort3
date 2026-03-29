import { useContext } from "react";
import { BulbContext } from "./BulbProvider.jsx";

function BulbState() {
    const { bulbOn } = useContext(BulbContext);
    return (
        <div>
            {bulbOn ? "Bulb is on" : "Bulb is off"}
        </div>
    )
}

export default BulbState;