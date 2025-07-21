import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { hitRequested, hitSuccess } from './slice';
import { AudioService } from '../../services/audio';

const HIT_SOUND_ID = 'hit';
const HIT_SOUND_SRC = '/assets/sfx/btn_click.mp3';

function* onHit() {
  yield call(AudioService.load, HIT_SOUND_ID, HIT_SOUND_SRC);
  yield call(AudioService.play, HIT_SOUND_ID);

  yield delay(100);

  yield put(hitSuccess());
}

export function* enemySaga() {
  yield takeLatest(hitRequested.type, onHit);
}
