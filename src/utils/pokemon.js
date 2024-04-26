export const getAllPokemon = (url) => {
  // 非同期処理になるので、new Promise()というオブジェクトを使う
  return new Promise((resolve, reject) => {
    // 成功したらjson形式に変換する（.then((res) => res.json())）
    // json形式化したものをdataとして受け取り、resolve関数で成功したとdataを返す
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};
