import React, { act } from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initalState);

    const onConfirm = () => dispatch({type: actionTypes.confirm});
    

    const onError = () => dispatch({type: actionTypes.error});

    const onWrite = (event) => {
        dispatch({
            type: actionTypes.write,
            payload: event.target.value
        });
    }

    const onCheck = () => dispatch({type: actionTypes.check});


    const onDelete = () => dispatch({type: actionTypes.delete});
 

    const onReset = () => dispatch({type: actionTypes.reset});


    console.log(state);

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
                    //aqui ya se envia el event automaticamente
                    onChange={onWrite}
                />
                <button
                    onClick={() => {
                        dispatch({
                            type: actionTypes.check
                        })
                    }}
                >Comprobar</button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Pedimos confirmaxion. Estas segur@?</p>
                <button
                    onClick={onDelete}
                >
                    Si, eliminar
                </button>

                <button
                    onClick={onReset}
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
                    onClick={onReset}
                >
                    Resetear, volver a atras
                </button>
            </React.Fragment>
        );
    }
}


const initalState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
};

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    write: 'WRITE',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET',
};

/* const reducerIf = (state, action) => {
    if (action.type === 'ERROR') {
        return {
            ...state,
            error: true,
            loading: false,
        }
    } else if (action.type === 'CHECK') {
        return {
            ...state,
            loading: true,
        }
    } else {
        return {
            ...state,
        }
    }
}

const reducerSwitch = (state, action) => {
    switch (action.type) {
        case 'CONFIRM':
            return {
                ...state,
                loading: false,
                error: false,
                confirmed: true,
            };
        case 'ERROR':
            return {
                ...state,
                error: true,
                loading: false,
            };
        case 'CHECK':
            return {
                ...state,
                loading: true,
            };
        case 'DELETE':
            return {
                ...state,
                deleted: true,
            };
        case 'RESET':
            return {
                ...state,
                confirmed: false,
                deleted: false,
                value: '',
            };

        case 'WRITE': 
            return{
                ...state,
                value: action.payload
            };

        default:
            return state;
    }
};

 */
const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: {
        ...state,
        loading: false,
        error: false,
        confirmed: true,
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.check]:
    {
        ...state,
        loading: true,
    },
    [actionTypes.write]: {
        ...state,
        value: payload
    },
    [actionTypes.delete]:
    {
        ...state,
        deleted: true,
    },
    [actionTypes.reset]:
    {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    }
})

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state;
    }
}


export { UseReducer };
