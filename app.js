"use strict";

Vue.use(window["vue-js-modal"].default);

Vue.component("character", {
  template: "#character",
  props: {
    char: Object
  },
  computed: {
    id() {
      return this.char.id;
    },
    type() {
      return this.char.type;
    },
    player() {
      return this.type == "player";
    },
    image() {
      return this.char.image;
    },
    initiative() {
      return this.char.initiative;
    },
    tokens() {
      return this.char.tokens;
    },
    life() {
      return this.char.life;
    },
    empty() {
      if (this.player) {
        return false;
      }
      return this.tokens.every(token => token.type == -1);
    }
  },
  methods: {
    add(index, type) {
      this.tokens[index].type = type;
      this.tokens[index].life = this.life[type];
    },
    remove(index) {
      this.tokens[index].type = -1;
    }
  }
});

Vue.component("counter", {
  template: "#counter",
  props: {
    value: Number,
    max: {
      type: Number,
      default: 999
    },
    min: {
      type: Number,
      default: 0
    },
    reverse: {
      type: Boolean,
      default: false
    },
    overflow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click(step = 1) {
      if (this.reverse) this.decrease(step);
      else this.increase(step);
    },
    rclick(step = 1) {
      if (this.reverse) this.increase(step);
      else this.decrease(step);
    },
    decrease(step = 1) {
      this.$emit(
        "input",
        Math.max(this.overflow ? -999 : this.min, this.value - step)
      );
    },
    increase(step = 1) {
      this.$emit(
        "input",
        Math.min(this.overflow ? 999 : this.max, this.value + step)
      );
    }
  }
});

const app = new Vue({
  el: "#app",
  data: {
    initiative: 1,
    editingIndex: null,
    images: {
      player: [
        {
          src: "img/character/Brute.png",
          name: "ブルート"
        },
        {
          src: "img/character/Tinkerer.png",
          name: "ティンカラー"
        },
        {
          src: "img/character/Spellweaver.png",
          name: "スペルヴィーバー"
        },
        {
          src: "img/character/Scoundrel.png",
          name: "スカウンダレル"
        },
        {
          src: "img/character/Cragheart.png",
          name: "クラグハート"
        },
        {
          src: "img/character/Mindthief.png",
          name: "マインドシーフ"
        }
      ],
      monster: [
        {
          src: "img/monster/Bandit-Guard.jpg",
          name: "盗賊の衛兵"
        },
        {
          src: "img/monster/Bandit-Archer.jpg",
          name: "盗賊の射手"
        },
        {
          src: "img/monster/City-Guard.jpg",
          name: "街の衛兵"
        },
        {
          src: "img/monster/City-Archer.jpg",
          name: "街の射手"
        },
        {
          src: "img/monster/Inox-Guard.jpg",
          name: "アイノックスの衛兵"
        },
        {
          src: "img/monster/Inox-Archer.jpg",
          name: "アイノックスの射手"
        },
        {
          src: "img/monster/Inox-Shaman.jpg",
          name: "アイノックスのシャーマン"
        },
        {
          src: "img/monster/Vermling-Scout.jpg",
          name: "ヴァームリングの斥候"
        },
        {
          src: "img/monster/Vermling-Shaman.jpg",
          name: "ヴァームリングのシャーマン"
        },
        {
          src: "img/monster/Savvas-Icestorm.jpg",
          name: "吹雪のサヴァス"
        },
        {
          src: "img/monster/Savvas-Lavaflow.jpg",
          name: "溶炎のサヴァス"
        },
        {
          src: "img/monster/Cultist.jpg",
          name: "カルト信者"
        },
        {
          src: "img/monster/Skeleton.jpg",
          name: "生ける骸骨"
        },
        {
          src: "img/monster/Zombie.jpg",
          name: "生ける屍者"
        },
        {
          src: "img/monster/Ghost.jpg",
          name: "生ける亡霊"
        },
        {
          src: "img/monster/Ooze.jpg",
          name: "ウーズ"
        },
        {
          src: "img/monster/Giant-Viper.jpg",
          name: "大鎖蛇"
        },
        {
          src: "img/monster/Hound.jpg",
          name: "恐狼"
        },
        {
          src: "img/monster/Stone-Golem.jpg",
          name: "石のゴーレム"
        },
        {
          src: "img/monster/Ancient-Artillery.jpg",
          name: "古代の大砲"
        },
        {
          src: "img/monster/Vicious-Drake.jpg",
          name: "唾吐きドレーク"
        },
        {
          src: "img/monster/Spitting-Drake.jpg",
          name: "八つ裂きドレーク"
        },
        {
          src: "img/monster/Black-Imp.jpg",
          name: "黒インプ"
        },
        {
          src: "img/monster/Flame-Demon.jpg",
          name: "業火の魔神"
        },
        {
          src: "img/monster/Frost-Demon.jpg",
          name: "氷雪の魔神"
        },
        {
          src: "img/monster/Wind-Demon.jpg",
          name: "陰風の魔神"
        },
        {
          src: "img/monster/Earth-Demon.jpg",
          name: "大地の魔神"
        },
        {
          src: "img/monster/Sun-Demon.jpg",
          name: "太陽の魔神"
        },
        {
          src: "img/monster/Night-Demon.jpg",
          name: "黒夜の魔神"
        }
      ],
      object: [
        {
          src: "img/monster/boss.png",
          name: "ボス"
        },
        {
          src: "img/other/object.png",
          name: "破壊可能オブジェクト"
        }
      ]
    },
    chars: []
  },
  computed: {
    editingChar() {
      return this.chars[this.editingIndex];
    },
    editingCharImages: {
      get() {
        return {
          image: this.editingChar.image,
          type: this.editingChar.type
        };
      },
      set(value) {
        this.editingChar.image = value.image;
        this.editingChar.type = value.type;
      }
    }
  },
  methods: {
    addCharacter(index = 0, type = "player") {
      this.chars.push({
        type: type,
        image: this.images[type][index].src,
        initiative: 0,
        life: [10, 20],
        tokens: Array(10)
          .fill(0)
          .map(() => {
            return { type: -1, life: 0 };
          })
      });
    },
    addPlayer(index) {
      this.addCharacter(index, "player");
    },
    addMonster(index) {
      this.addCharacter(index, "monster");
    },
    removeCharacter(index) {
      this.chars.splice(index, 1);
    },
    setInitiative(char) {
      if (char.initiative == 0) {
        char.initiative = this.initiative++;
      }
    },
    resetInitiative() {
      this.initiative = 1;
      this.chars.forEach(char => {
        char.initiative = 0;
      });
    },
    showEdit(index) {
      this.editingIndex = index;
      this.$nextTick().then(() => this.$modal.show("editDialog"));
    },
    hideEdit() {
      this.$modal.hide("editDialog");
    },
    removeEdit(index) {
      this.editingIndex = null;
      this.removeCharacter(index);
      this.hideEdit();
    }
  },
  mounted() {
    this.addPlayer(3);
    this.addPlayer(4);
  }
});
