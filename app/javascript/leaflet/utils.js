import { latLngBounds, Util, geoJSON, latLng  } from "leaflet";

export const bboxToBounds = (bbox) => {
  bbox = bbox.split(" ");
  if (bbox.length === 4) {
    return latLngBounds([
      [parseFloat(bbox[1]), parseFloat(bbox[0])],
      [parseFloat(bbox[3]), parseFloat(bbox[2])],
    ]);
  } else {
    throw new Error("Invalid bounding box string");
  }
};

export const boundsToBbox = (bounds) => {
  let sw = bounds.getSouthWest(),
    ne = bounds.getNorthEast();

  if (ne.lng - sw.lng >= 360) {
    sw.lng = -180;
    ne.lng = 180;
  }
  sw = sw.wrap();
  ne = ne.wrap();
  return [
    Util.formatNum(sw.lng, 6),
    Util.formatNum(sw.lat, 6),
    Util.formatNum(ne.lng, 6),
    Util.formatNum(ne.lat, 6),
  ];
};

export const geoJSONToBounds = (geojson) => {
  const layer = geoJSON(geojson);
  return layer.getBounds();
};

export const debounce = (fn, delay) => {
  let timeout = null;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

export const getTileJsonBounds = (doc) => {
  const bounds = doc.bounds;
  if (bounds) {
    const corner1 = latLng(bounds[1], bounds[0]),
      corner2 = latLng(bounds[3], bounds[2]);
    return latLngBounds(corner1, corner2);
  }
};

export const appendLoadingMessage = () => {
  const spinner = `<tbody class="attribute-table-body"><tr><td colspan="2">
    <span id="attribute-table">
    <div class="spinner-border" role="status"><span class="sr-only">Inspecting</span></div>
    </span>
    </td></tr></tbody>`;

  document.querySelector(".attribute-table-body").innerHTML = spinner;
};

export const appendErrorMessage = () => {
  document.querySelector(
    ".attribute-table-body"
  ).innerHTML = `<tbody class="attribute-table-body">
    <tr><td colspan="2">Could not find that feature</td></tr></tbody>`;
};

// Looks for strings that could be URLs and wraps them in <a> tags
export const linkify = (str) => {
  if (!str) return '';
  const urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
  return str.toString().replace(urlRegEx, '<a href=\'$1\'>$1</a>');
}

export const getLayerOpacity = (layer) => {
  return layer.options.fillOpacity ? layer.options.fillOpacity : layer.options.opacity;
}