import { call, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

//Include Both Helper File with needed methods
//import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postLogin } from "../../../helpers/adomsbackend_helper";

//const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_API_URL) {
      const headers = {
        Authorization: process.env.REACT_APP_API_KEY
      };
      const data = {
        email_user: user.email,
        password_user: user.password
      };
      const response = yield call(postLogin, data, { headers: headers });
      sessionStorage.setItem("authUser", JSON.stringify(response));
      if (response.success) {
        yield put(loginSuccess(response.data));
        history.push("/dashboard");
      } else {
        yield put(apiError(response.description));
      }
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser() {
  try {
    sessionStorage.removeItem("authUser");
    yield put(logoutUserSuccess(LOGOUT_USER, true));
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
