import ToggleBulbState from "./ToggleBulbState.jsx";
import BulbState from "./BulbState.jsx"
import BulbProvider from "./BulbProvider.jsx";

function LightBulb() {

    return (
        <div>
            <BulbProvider>
                <BulbState />
                <ToggleBulbState />
            </BulbProvider>
        </div>

    )
}

export default LightBulb;