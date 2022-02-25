import React from "react";
const Navigation = () => {
    return(
        <nav style={{display: "flex", justifyContent: "flex-end"}}>
            <p className="f3 link dim gray underline pa3 pointer" style={{position: "fixed"}}>
                Sign Out
            </p>
        </nav>
    );
}
export default Navigation;