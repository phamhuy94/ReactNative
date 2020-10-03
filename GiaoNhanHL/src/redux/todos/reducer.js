const initialState = {
    todos: [],
    otherState: 1
}
const todos = (state = initialState,action) => {
    switch (action.type){
        case 'ADD_TODO':
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: state.todos.length + 1,
                        text: action.text,
                        completed: false,
                    }
                ],
            }
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map((todo) => 
                    todo.id === action.id ? {...todo, completed: !todo.completed} : todo,
                ),
            }       
        default:
            return state
    } 
}

export default todos