import React from "react";

class Loading extends React.Component {

    componentWillUnmount(){
        console.log("cwu")
    }
    render() {
        return (
            <div>
                <p>Cargando...</p>
            </div>
        );
    }
}

export { Loading };