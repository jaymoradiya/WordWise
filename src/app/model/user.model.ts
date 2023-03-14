export class UserModel {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _refreshToken: string,
    private _expireAt: Date
  ) {}

  get token() {
    if (!this._expireAt || this._expireAt < new Date()) {
      return null;
    }
    return this._token;
  }

  static fromJson(json: {
    email: string;
    id: string;
    _token: string;
    _refreshToken: string;
    _expireAt: string;
  }) {
    return new UserModel(
      json['email'],
      json['id'],
      json['_token'],
      json['_refreshToken'],
      new Date(json['_expireAt'])
    );
  }

  toJson() {
    return {
      email: this.email,
      id: this.id,
      _token: this._token,
      _refreshToken: this._refreshToken,
    };
  }
}
