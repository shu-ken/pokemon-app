import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon } from "./utils/pokemon";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  // 初期ローディングの時に、読み込み中を表示するための状態変数
  const [loading, setLoading] = useState(true);

  // ブラウザをリロードしたときに、ポケモンの情報を全て取得したいのでuseEffectを使う。
  // ブラウザがロードされた時に一回だけ呼び出してほしいので、第二引数には空の配列で指定する。
  useEffect(() => {
    // 非同期処理でやるので、async関数をつける
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      setLoading(false); //loadingをオフにする
    };
    fetchPokemonData();
  }, []);

  return (
    <div className="App">
      {loading ? <h1>ロード中...</h1> : <h1>ポケモンカードを取得しました。</h1>}
    </div>
  );
}

export default App;
