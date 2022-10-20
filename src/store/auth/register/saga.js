import { takeEvery, fork, put, all, call } from "redux-saga/effects";

//Account Redux states
import { REGISTER_USER } from "./actionTypes";
import { registerUserSuccessful, registerUserFailed } from "./actions";

//Include Both Helper File with needed methods
import { postRegister} from "../../../helpers/adomsbackend_helper";

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {
    if (process.env.REACT_APP_API_URL) {
      const headers = {
        Authorization: process.env.REACT_APP_API_KEY
      };
      delete user.confirm_password_user;
      const response = yield call(postRegister, user, { headers: headers });
      if (response.success) {
        yield put(registerUserSuccessful(response.data));
      } else {
        yield put(registerUserFailed(response.description));
      }
    }
  } catch (error) {
    console.log("error: ", error);
    yield put(registerUserFailed(error));
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;
