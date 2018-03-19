import { CategoryManager } from '../Manager/category'

const addType = (array, type) => {
    return array.map(item => {
        return { ...item, type: type }
    })
}

export default {
    namespace: 'editor',
    state: { category: [] },
    reducer: {
        change(state, { payload }) {
            return { ...state, routerState: payload, isRedirect: false }
        },
        redirect(state, { payload }) {
            return {
                ...state,
                redirectPath: { pathname: payload.redirectPath },
                isRedirect: payload.isRedirect
            }
        },
        mapCategory(state, { payload }) {
            return {
                ...state,
                category: payload.list,
                type: payload.type,
                categoryID: payload.categoryID
            }
        },
        'mapCategory/Excersise'(state, { payload }) {
            const item = state.category.find(
                i => i.categoryID === payload.categoryID
            )

            return {
                ...state,
                categoryExcersise: payload.list,
                type: payload.type,
                categoryID: payload.categoryID,
                currentCategory: item
            }
        }
    },
    effects: {
        *deleteCategory({ put, call }, { payload }) {
            const Category = new CategoryManager(call)
            const json = yield Category.fetch('/category/delete', {
                categoryID: payload
            })
            yield put({
                type: 'mapCategory',
                payload: {
                    list: addType(json.payload.category, 'category'),
                    type: 'category'
                }
            })
        },
        *addCategory({ put, call }, { payload }) {
            const Category = new CategoryManager(call)
            const json = yield Category.fetch('/category/create', {
                categoryName: payload,
                categoryID: Date.now()
            })
            yield put({
                type: 'mapCategory',
                payload: {
                    list: addType(json.payload.category, 'category'),
                    type: 'category'
                }
            })
        },
        *bindExerciseToCate({ put, call }, { payload }) {
            const Category = new CategoryManager(call)
            const json = yield Category.fetch('/category/bind', {
                categoryID: payload.categoryID,
                exerciseID: payload.id
            })

            yield put({
                type: 'mapCategory/Excersise',
                payload: {
                    list: addType(json.payload.exercise, 'exercise'),
                    type: 'exercise',
                    categoryID: payload.categoryID
                }
            })
        },
        *deleteFromCategory({ put, call }, { payload }) {
            const Category = new CategoryManager(call)
            console.log(payload)
            const json = yield Category.fetch('/category/exercise/remove', {
                categoryID: payload.categoryID,
                exerciseID: payload.id
            })

            yield put({
                type: 'mapCategory/Excersise',
                payload: {
                    list: addType(json.payload.exercise, 'exercise'),
                    type: 'exercise',
                    categoryID: payload.categoryID
                }
            })
        },
        *fetchExcersise({ put, call }, { payload }) {
            yield put({
                type: 'mapCategory/Excersise',
                payload: []
            })
            const Category = new CategoryManager(call)
            const json = yield Category.getCategory(
                '/category/exercise/' + payload
            )
            yield put({
                type: 'mapCategory/Excersise',
                payload: {
                    list: addType(json.payload.exercise, 'exercise'),
                    type: 'exercise',
                    categoryID: payload
                }
            })
        },
        *fetchCategory({ put, call, select }, { payload }) {
            const Category = new CategoryManager(call)
            const json = yield Category.getCategory('/category')
            yield put({
                type: 'mapCategory',
                payload: {
                    list: addType(json.payload.category, 'category'),
                    type: 'category'
                }
            })
        }
    }
}
