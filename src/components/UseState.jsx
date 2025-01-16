import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    });
/*     console.log(state);
 */
    const onConfirm = () => {
        setState({
            ...state,
            loading: false,
            error: false,
            confirmed: true,
        });
    }

    const onError = () => {
        setState({
            ...state,
            loading: false,
            error: true,
        });
    }

    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue
        })
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true
        })
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
        })
    }

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
        })
    }
    React.useEffect(() => {
        console.log("Empezando el efetcto")

        if (!!state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validacion");
                if (state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }

                console.log("terminando la vaidacion");
            }, 3000);
        }
        console.log("Terminando el efecto");
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el codigo de seguridad</p>

                {/*             esta es la forma mas optima de mostrar el mensaje de error cuando es correcto, y sin actualizar el estado */}
                {(state.error && !state.loading) && (
                    <p>Error: el codigo es incorrecto</p>
                )}

                {state.loading && (
                    <p>loading...   </p>
                )}
                <input
                    type="text"
                    placeholder="Codigo de seguridad"
                    value={state.value}
                    onChange={(event) => {
                        onWrite(event.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        onCheck();
                    }}
                >Comprobar</button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Pedimos confirmaxion. Estas segur@?</p>
                <button
                    onClick={() => {
                        onDelete();
                    }}
                >
                    Si, eliminar
                </button>

                <button
                    onClick={() => {
                        onReset();
                    }}
                >
                    No, me arrepenti
                </button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con exito</p>
                <button
                    onClick={() => {
                        onReset();
                    }}
                >
                    Resetear, volver a atras
                </button>
            </React.Fragment>
        );
    }
}

export { UseState };