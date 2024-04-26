import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import { getAllPokemon, getPokemon } from "./utils/pokemon";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  // 初期ローディングの時に、読み込み中を表示するための状態変数
  const [loading, setLoading] = useState(true);

  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  // ブラウザをリロードしたときに、ポケモンの情報を全て取得したいのでuseEffectを使う。
  // ブラウザがロードされた時に一回だけ呼び出してほしいので、第二引数には空の配列で指定する。
  useEffect(() => {
    // 非同期処理でやるので、async関数をつける
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細データを取得
      loadPokemon(res.results);
      // console.log(res);
      setNextURL(res.next);
      setPrevURL(res.previous);

      setLoading(false); //loadingをオフにする
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    // 20種類のポケモンデータを一つ一つ取得するので、これらが全て取得されるまで待つ（Promise.all）
    // fetchは非同期処理で時間がかかる
    // Promise.allの()内には配列(ここでいうdata)を入れるため、map関数で展開した。
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handleNextPage = async () => {
    if (!nextURL) return;
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    console.log(data);
    console.log(nextURL);
    console.log(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handlePrevPage = async () => {
    if (!prevURL) return;

    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中...</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                // console.log(pokemon.id);
                return (
                  <Card key={i} pokemon={pokemon} initialURL={initialURL} />
                );
              })}
            </div>

            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
