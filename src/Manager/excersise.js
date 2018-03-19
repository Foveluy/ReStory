import { BaseManager } from './base'

export class ExcersiseManager extends BaseManager {
    *getExcersise(url) {
        return yield this.Get(url)
    }

    *addExerciseSet(body) {
        return yield this.fetch('/exercise/set/create', body)
    }

    *addExercise(body){
        return yield this.fetch('/exercise/create', body)
    }
}
