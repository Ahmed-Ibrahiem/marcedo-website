export function UpdateFavoriteStorage(favoriteItems) {
  localStorage.FavoriteStorage = JSON.stringify(favoriteItems);
}
export function UpdateCartItemsStorage(CartItems) {
  localStorage.CartItemsStorage = JSON.stringify(CartItems);
}