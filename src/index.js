import './index.css'
import { message } from 'antd'
import registerServiceWorker from './registerServiceWorker'
import { Rluy } from './rluyconfig'

Rluy.router(require('./router'))

Rluy.onError(e => {
    console.log('发生错误', e)
    message.error('客户端功能未实现或者发生错误')
})

Rluy.run(document.getElementById('root'))

registerServiceWorker()
