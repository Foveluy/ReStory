import { ExcersiseManager } from '../Manager/excersise'
import { message } from 'antd'

export default {
    namespace: 'exercise',
    state: { history: [] },
    reducer: {
        bindHistory(state, { payload }) {
            return { ...state, ...payload }
        },
        bindExcersise(state, { payload }) {
            return { ...state, exercise: payload }
        }
    },
    effects: {
        *fetchHistory({ put, call }, { payload }) {
            yield put({
                type: 'bindHistory',
                payload: []
            })
            const exmanager = new ExcersiseManager(call)
            const json = yield exmanager.getExcersise(
                `/exercise/history/${payload}`
            )
            yield put({
                type: 'bindHistory',
                payload: json.payload
            })
        },
        *fetchExerciseAll({ put, call }, { payload }) {
            yield put({
                type: 'bindExcersise',
                payload: []
            })
            const exmanager = new ExcersiseManager(call)
            const json = yield exmanager.getExcersise('/exercise')
            yield put({
                type: 'bindExcersise',
                payload: json.payload.exercise
            })
        },
        *addExerciseSet({ put, call }, { payload }) {
            console.log(payload)

            const exmanager = new ExcersiseManager(call)
            const json = yield exmanager.addExerciseSet({
                date: Date.now(),
                sets: payload.sets,
                exerciseID: payload.exerciseID
            })
            if (json.Success) {
                message.success('加入成功')
            } else {
                message.error('加入失败')
            }
        },
        *deleteExercise({ put, call }, { payload }) {
            const exmanager = new ExcersiseManager(call)
            const json = yield exmanager.getExcersise(
                '/exercise/delete/' + payload
            )
            yield put({
                type: 'bindExcersise',
                payload: json.payload.exercise
            })
        },
        *deleteHistory({ put, call }, { payload }) {
            const exmanager = new ExcersiseManager(call)
            const json = yield exmanager.fetch(
                '/exercise/history/delete',
                payload
            )
            yield put({
                type: 'bindHistory',
                payload: json.payload
            })
        },
        *addExercise({ put, call }, { payload }) {
            const exmanager = new ExcersiseManager(call)

            const json = yield exmanager.addExercise({
                ...payload
            })
            if (json.Success) {
                yield put({
                    type: 'bindExcersise',
                    payload: json.payload.exercise
                })
            } else {
                message.error(json.message)
            }
        }
    }
}
