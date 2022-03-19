var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Tile_tileElement, _Tile_x, _Tile_y, _Tile_value;
export default class Tile {
    constructor(tileContainer, value = Math.random() > .5 ? 2 : 4) {
        _Tile_tileElement.set(this, void 0);
        _Tile_x.set(this, 0);
        _Tile_y.set(this, 0);
        _Tile_value.set(this, 0);
        __classPrivateFieldSet(this, _Tile_tileElement, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _Tile_tileElement, "f").classList.add("tile");
        tileContainer.append(__classPrivateFieldGet(this, _Tile_tileElement, "f"));
        this.value = value;
    }
    get value() {
        return __classPrivateFieldGet(this, _Tile_value, "f");
    }
    set value(v) {
        __classPrivateFieldSet(this, _Tile_value, v, "f");
        __classPrivateFieldGet(this, _Tile_tileElement, "f").textContent = `${v}`;
        const power = Math.log2(v);
        const backgroundLightness = 100 - power * 9;
        __classPrivateFieldGet(this, _Tile_tileElement, "f").style.setProperty("--background-lightness", `${backgroundLightness}%`);
        const textLightness = backgroundLightness <= 50 ? 90 : 10;
        __classPrivateFieldGet(this, _Tile_tileElement, "f").style.setProperty("--text-lightness", `${textLightness}%`);
    }
    set x(value) {
        __classPrivateFieldSet(this, _Tile_x, value, "f");
        __classPrivateFieldGet(this, _Tile_tileElement, "f").style.setProperty("--x", `${value}`);
    }
    set y(value) {
        __classPrivateFieldSet(this, _Tile_y, value, "f");
        __classPrivateFieldGet(this, _Tile_tileElement, "f").style.setProperty("--y", `${value}`);
    }
    remove() {
        __classPrivateFieldGet(this, _Tile_tileElement, "f").remove();
    }
    waitForTransition(animation = false) {
        return new Promise(resolve => {
            __classPrivateFieldGet(this, _Tile_tileElement, "f").addEventListener(animation ? "animationend" : "transitionend", resolve, { once: true });
        });
    }
}
_Tile_tileElement = new WeakMap(), _Tile_x = new WeakMap(), _Tile_y = new WeakMap(), _Tile_value = new WeakMap();
