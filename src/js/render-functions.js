import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector(".gallery");
const loaderEl = document.getElementById("loader");
const loadMoreWrapper = document.querySelector(".load-more-wrapper");
const loadMoreBtn = document.getElementById("load-more-btn");

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  if (!Array.isArray(images) || images.length === 0) return;

  const markup = images.map(img => {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = img;

    return `
      <li class="gallery-item">
        <a class="card" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <div class="meta">
            <div class="stat">
              <span class="stat-title">Likes</span>
              <span class="stat-value">${likes}</span>
            </div>
            <div class="stat">
              <span class="stat-title">Views</span>
              <span class="stat-value">${views}</span>
            </div>
            <div class="stat">
              <span class="stat-title">Comments</span>
              <span class="stat-value">${comments}</span>
            </div>
            <div class="stat">
              <span class="stat-title">Downloads</span>
              <span class="stat-value">${downloads}</span>
            </div>
          </div>
        </div>
        </a>
      </li>
    `;
  }).join("");

  galleryEl.insertAdjacentHTML("beforeend", markup);

  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = "";
  lightbox.refresh();
}

export function showLoader() {
  loaderEl.classList.remove("is-hidden");
  loaderEl.classList.add("is-visible");
  loaderEl.setAttribute("aria-hidden", "false");
}

export function hideLoader() {
  loaderEl.classList.remove("is-visible");
  loaderEl.classList.add("is-hidden");
  loaderEl.setAttribute("aria-hidden", "true");
}

export function showLoadMoreButton() {
  document.querySelector('.load-more-wrapper').classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  document.querySelector('.load-more-wrapper').classList.add('is-hidden');
}
