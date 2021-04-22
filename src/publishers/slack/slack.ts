import axios from 'axios'
import { FreeContent } from '../../interfaces'
import { buildSlackMessage } from './post-body-builder'

export async function publishToSlack(freeContent: FreeContent): Promise<void> {
    if (process.env.SLACK_HOOK) {
        await axios.post(process.env.SLACK_HOOK, buildSlackMessage(freeContent))
    }
}
