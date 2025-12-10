import "izitoast/dist/css/iziToast.css";
import iziToast from "izitoast";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import "loaders.css/loaders.min.css";
import "./css/styles.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions.js";

let currentPage = 1;
let currentQuery = "";
let totalHits = 0;

const loadMoreBtn = document.getElementById("load-more-btn");
const form = document.querySelector(".form");
const input = form.querySelector('input[name="search-text"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = input.value.trim();

  if (!query) {
    iziToast.error({
      title: "Error",
      message: "Please enter a search term.",
      position: "topRight",
    });
    return;
  }

  currentPage = 1;
  currentQuery = query;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, currentPage);

    totalHits = data.totalHits;
    const hits = data.hits;

    if (hits.length === 0) {
      iziToast.info({
        title: "No results",
        message: "Sorry, there are no images matching your search query.",
        position: "topRight",
      });
      return;
    }

    createGallery(hits);

    if (hits.length >= 15 && totalHits > hits.length) {
      showLoadMoreButton();
    }

  } catch (err) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong",
      position: "topRight",
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    const cardHeight = document
      .querySelector(".gallery-item")
      .getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });

    const totalLoaded = document.querySelectorAll(".gallery-item").length;

    if (totalLoaded >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: "End of results",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }

  } catch (err) {
    iziToast.error({
      title: "Error",
      message: "Failed to load more images.",
      position: "topRight",
    });
  } finally {
    hideLoader();
  }
});
