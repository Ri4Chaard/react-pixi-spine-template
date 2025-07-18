import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { hitRequested, hitSuccess } from './slice';
import { AudioService } from '../../services/audio';

// Пути до ассетов:
const HIT_SOUND_ID = 'hit';
const HIT_SOUND_SRC = '/assets/sfx/hit.mp3';

function* onHit() {
  // загружаем и играем звук
  yield call(AudioService.load, HIT_SOUND_ID, HIT_SOUND_SRC);
  yield call(AudioService.play, HIT_SOUND_ID);

  // имитируем небольшую задержку
  yield delay(100);

  // обновляем счётчик
  yield put(hitSuccess());
}

export function* enemySaga() {
  yield takeLatest(hitRequested.type, onHit);
}
