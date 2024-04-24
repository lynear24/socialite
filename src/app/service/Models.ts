export class ImageItem {
  _id!: String;
  name!: String;
  desc!: String;
  by_username!: String;
  imgurl!: String;
  owner!: String;
}

export class User {
  _id!: String;
  username!: String;
  password!: String;
  isLoggedIn!: Boolean;
}
