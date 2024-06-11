import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

import jwkToPem from "jwk-to-pem";
import dotenv from "dotenv";

dotenv.config();

const poolData = {
  UserPoolId: "us-east-1_XlnmB8H2j",
  ClientId: "6khb4jd0j3ueiul0nq3i9ciici",
};

const aws_region = process.env.REGION;

const userPool = new CognitoUserPool(poolData);

export const signup = (name, email, password) => {
  try {
    return new Promise((result, reject) => {
      const attributeList = [];

      attributeList.push(
        new CognitoUserAttribute({ Name: "name", Value: name })
      );
      attributeList.push(
        new CognitoUserAttribute({ Name: "email", Value: email })
      );

      userPool.signUp(email, password, attributeList, null, (err, data) => {
        if (err) reject(err);
        else result(data);
      });
    });
  } catch (error) {
    reject(error);
  }
};

export const verifyCode = async (email, code) => {
  try {
    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        throw err;
      } else {
        return result;
      }
    });
  } catch (error) {
    console.log("error=>", error);
  }
};

export const loginCognito = async (email, password) => {
  try {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    const result = await new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          });
        },
        onFailure: (err) => {
          reject({
            message: "Failed",
            result: err,
          });
        },
      });
    });

    return result;
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
};
