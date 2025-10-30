  $(document).ready(function() {
    // Pengaturan API
    const API_URL = 'https://live-football-api.p.rapidapi.com/news-by-date?page=1&date=2025-10-30'; 
    const HEADERS = {
      'x-rapidapi-key': '8d6fc1158amsheca3d0d4a86d7e5p1301a0jsnae7d503f3281', 
      'x-rapidapi-host': 'live-football-api.p.rapidapi.com'
    };

    // Deklarasi fungsi ASYNC
    async function fetchNews() { 
      const newsContainer = $('#news-container');
      const errorMessage = $('#error-message');
      
      // Tampilkan loading state
      newsContainer.html(
        `<div class="bg-white rounded-xl shadow-lg p-6 animate-pulse col-span-full" id="loading-state">
           <div class="h-48 bg-gray-200 rounded-lg mb-4"></div>
           <div class="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
         </div>`
      );
      errorMessage.hide();
      $('#load-more-btn').hide();

      try {
        //Gunakan AWAIT untuk menunggu Fetch API
        const responseRaw = await fetch(API_URL, {
          method: 'GET',
          headers: HEADERS
        });
        
        //Cek jika status respons
        if (!responseRaw.ok) {
            let errorText = `Gagal memuat data. Status Server: ${responseRaw.status}. `;
            if (responseRaw.status === 403) {
                errorText += "Akses Ditolak (403 Forbidden). Cek kembali API Key atau Host Anda di RapidAPI.";
            } else if (responseRaw.status === 429) {
                errorText += "Melebihi Batas Quota (429 Too Many Requests). Coba lagi besok.";
            } else {
                errorText += "Terjadi kesalahan server yang tidak diketahui.";
            }
            throw new Error(errorText);
        }

        //Gunakan AWAIT untuk menunggu parsing JSON
        const response = await responseRaw.json();
        
        // Hapus loading state
        newsContainer.empty(); 

        //Logika Pemrosesan Data
        let newsData = [];
        if (response && Array.isArray(response.response)) {
            newsData = response.response.slice(0, 6);
        } 
        
        if (newsData.length > 0) {
          newsData.forEach(item => {
            // Mapping properti data

            // title
            const title = item.title || 'Judul Tidak Diketahui';
            // summary
            const summary = "Berita tentang: " + title + " selengkapnya...";            
            // image
            const imageUrl = item.image; 
            // url
            const articleUrl = item.original_url || '#';             
            // date
            let publishedAt = 'Tanggal Tidak Diketahui';
            if (item.published_at) {
                const [datePart, timePart] = item.published_at.split(' ');
                const dateParts = datePart.split('-'); 
                const safeDateFormat = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]} ${timePart}`; 

                publishedAt = new Date(safeDateFormat).toLocaleDateString('id-ID', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
            }
            
            //Card Berita
            const card = `
              <div class="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl transform hover:-translate-y-1">
                
                <img src="${imageUrl}" alt="${title}" class="w-full h-52 object-cover object-center" onerror="this.onerror=null;this.src='https://via.placeholder.com/400x200?text=FutsalArena+News'"/>
                
                <div class="p-6">
                  <p class="text-sm text-gray-500 mb-2">${publishedAt}</p>
                  <h4 class="text-xl font-bold text-gray-800 mb-3 hover:text-green-600 cursor-pointer">${title}</h4>
                  <p class="text-gray-600 mb-4 line-clamp-3">${summary}</p>
                  <a href="${articleUrl}" target="_blank" class="text-green-600 font-semibold hover:text-green-700 transition flex items-center">
                    Baca Sumber
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </a>
                </div>
              </div>
            `;
            newsContainer.append(card);
          });
        } else {
          newsContainer.html('<p class="text-center text-gray-600 col-span-full">Belum ada berita terbaru untuk tanggal ini.</p>');
        }
      } catch (error) {
        //menangani error
        newsContainer.empty();
        errorMessage.show();
        
        if (error.message.includes('Failed to fetch')) {
             errorMessage.html('<p class="text-center text-red-600 font-semibold mt-12 col-span-full">Gagal terhubung ke API. Ini kemungkinan besar masalah **CORS** atau Jaringan. Coba gunakan **CORS Unblocker** di browser Anda!</p>');
        } else {
            errorMessage.text(error.message);
        }
        console.error("Kesalahan API:", error);
      }
    }

    fetchNews();
  });
