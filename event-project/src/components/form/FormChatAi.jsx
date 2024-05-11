import { useState } from "react";
import axios from "axios";

function ChatBubble({ content, position }) {
  return (
    <div className={`chat ${position}`}>
      <div className="chat-bubble bg-slate-500 text-white">
        <p style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
          {content}
        </p> // Mengatur teks chat dalam bubble dengan pengaturan pemutusan kata dan pemeliharaan spasi
      </div>
    </div>
  );
}

function FormChatAi() {
  const [question, setQuestion] = useState(""); // Mendefinisikan state question dan fungsi setter setQuestion dengan useState, awalnya kosong
  const [chatHistory, setChatHistory] = useState([]); // State untuk menyimpan riwayat percakapan
  const [generatingAnswer, setGeneratingAnswer] = useState(false); // Mendefinisikan state generatingAnswer dan fungsi setter setGeneratingAnswer untuk menandai apakah jawaban sedang dihasilkan

  const handleSubmit = async (e) => {
    setGeneratingAnswer(true); // Mengatur generatingAnswer menjadi true untuk menunjukkan bahwa jawaban sedang dihasilkan
    e.preventDefault(); // Menghentikan perilaku bawaan dari form untuk mengirimkan data ke server

    // Menambahkan pesan dari pengguna ke riwayat percakapan
    setChatHistory((prevChat) => [ 
      ...prevChat,
      { content: question, fromUser: true },
    ]);

    // Menambahkan pesan tunggu ke riwayat percakapan
    setChatHistory((prevChat) => [
      ...prevChat,
      {
        content:
          "Memuat jawaban Anda... \n Ini mungkin memakan waktu hingga 10 detik",
        fromUser: false,
      },
    ]);

    try {
      const promptAwal =
        "kamu adalah seorang customer service bernama Daffa AI, kamu bertugas untuk memberikan penjelasn seputar aplikasi Event Project";

      // Data yang akan dikirimkan sebagai prompt ke API
      const contentData = {
        parts: [
          {
            text: `${promptAwal} + layanan yang akan kamu beri tahu  : {
              'Apa itu aplikasi Event Project': 'Aplikasi Event Project ini adalah aplikasi yang akan membantu anda untuk mengelola event',
            }, {
              'Bagaimana menggunakan aplikasi ini': 'Langkah langkah untuk menggunakan aplikasi ini yaitu pertama : pengguna harus login terlebih dahulu dan lalu pengguna bisa menambahkan event ',
            }, {
              'Fitur fitur': 'Fitur fitur dari aplikasi ini adalah seperti tambah event, edit, dan hapus, serta bisa menampilkan event dalam bentuk tampilan calendar, serta bisa berkomunikasi dengan customer servise dengan AI,
            }, 
            {
              'Apa saja teknologi yang digunakan': 'Teknologi yang digunakan dalam aplikasi ini adalah React JS, Taiwind CSS, dan Supabase.
            }, {
              'Oke terimakasih': 'Sama sama, senang dapat membantu anda
            } + pertanyaan dari user`,
          },
          { text: question },
        ],
      };

      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [contentData],
        },
      });

      const aiAnswer =
        response["data"]["candidates"][0]["content"]["parts"][0]["text"];

      // Menghapus pesan tunggu dari riwayat percakapan
      setChatHistory((prevChat) => prevChat.slice(0, -1));

      // Menambahkan jawaban AI ke riwayat percakapan
      setChatHistory((prevChat) => [
        ...prevChat,
        { content: aiAnswer, fromUser: false },
      ]);

    } catch (error) {
      console.log(error);
    }

    setQuestion("");
    setGeneratingAnswer(false);
  };

  return (
    <>
      <div className="bg-white h-screen p-3">
        <h1 className="text-3xl text-center mb-4">
          Daffa AI - Customer Service
        </h1>
        <div className="chat-container w-4/5 mx-auto overflow-auto max-h-80">
          {/* Menampilkan riwayat percakapan --> menggunakan TERNARY OPERATOR */}
          {chatHistory.map((message, index) => (
            <ChatBubble
              key={index}
              content={message.content}
              position={message.fromUser ? "chat chat-end" : "chat chat-start"}
            />
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-4/5 mx-auto text-center rounded bg-gray-50 py-2"
        >
          <textarea
            required
            className="border rounded w-full my-2 min-h-10 p-3"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Tanyakan sesuatu"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300"
            disabled={generatingAnswer}
          >
            Klik Disini
          </button>
        </form>
      </div>
    </>
  );
}

export default FormChatAi;
