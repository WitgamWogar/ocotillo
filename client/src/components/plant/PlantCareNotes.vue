<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-3">mdi-book-open-page-variant-outline</v-icon>
      <span class="headline">Information & Care Notes</span>
      <v-spacer></v-spacer>
      <v-btn color="rgb(11, 95, 75)" class="ml-2" icon large>
        <v-icon v-if="!editMode" @click="editMode = true"
          >mdi-pencil-box-outline</v-icon
        >
      </v-btn>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <h3 class="pa-5" v-if="!content">
        There aren't any notes yet...
      </h3>

      <editor-menu-bar
        :editor="editor"
        v-slot="{ commands, isActive }"
        v-if="editMode"
      >
        <div class="menubar text-center">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <v-icon color="black">mdi-format-bold</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <v-icon>mdi-format-italic</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <v-icon>mdi-format-underline</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <v-icon>mdi-format-paragraph</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            <v-icon>mdi-format-header-1</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            <v-icon>mdi-format-header-2</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            <v-icon>mdi-format-header-3</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <v-icon>mdi-format-list-bulleted</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <v-icon>mdi-format-list-numbered</v-icon>
          </button>

          <button class="menubar__button" @click="commands.horizontal_rule">
            <v-icon>mdi-minus</v-icon>
          </button>

          <button class="menubar__button" @click="commands.undo">
            <v-icon>mdi-undo</v-icon>
          </button>

          <button class="menubar__button" @click="commands.redo">
            <v-icon>mdi-redo</v-icon>
          </button>
        </div>
      </editor-menu-bar>

      <v-divider v-if="editMode"></v-divider>

      <div class="editor">
        <editor-menu-bubble
          class="menububble"
          :editor="editor"
          v-if="editMode"
          @hide="hideLinkMenu"
          v-slot="{ commands, isActive, getMarkAttrs, menu }"
        >
          <div
            class="menububble"
            :class="{ 'is-active': menu.isActive }"
            :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
          >
            <form
              class="menububble__form"
              v-if="linkMenuIsActive"
              @submit.prevent="setLinkUrl(commands.link, linkUrl)"
            >
              <input
                class="menububble__input"
                type="text"
                v-model="linkUrl"
                placeholder="https://"
                ref="linkInput"
                @keydown.esc="hideLinkMenu"
              />
              <button
                class="menububble__button"
                @click="setLinkUrl(commands.link, null)"
                type="button"
              >
                <v-icon color="white">mdi-delete</v-icon>
              </button>
            </form>

            <template v-else>
              <button
                class="menububble__button"
                @click="showLinkMenu(getMarkAttrs('link'))"
                :class="{ 'is-active': isActive.link() }"
              >
                <span>{{ isActive.link() ? 'Update Link' : 'Add Link' }}</span>
                <v-icon color="white">mdi-link</v-icon>
              </button>
            </template>
          </div>
        </editor-menu-bubble>

        <editor-content :editor="editor" class="px-3 mt-3" />
      </div>
    </v-card-text>

    <v-card-actions v-if="editMode" style="background-color:#1a1919;">
      <v-col>
        <v-btn color="grey" dark @click="cancelEdit" block>
          Cancel
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          color="rgb(11, 95, 75)"
          dark
          block
          :loading="$network.busy"
          @click="updateNotes"
        >
          Save
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
// Import the editor
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap';
import {
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Link,
  Underline,
  History,
} from 'tiptap-extensions';

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
  },
  props: ['plant'],
  data() {
    return {
      editor: null,
      editMode: false,
      content: '',
      linkUrl: null,
      linkMenuIsActive: false,
    };
  },
  watch: {
    editMode() {
      this.editor.setOptions({
        editable: this.editMode,
      });
      if (this.editMode) {
        this.editor.focus();
      }
    },
  },
  methods: {
    cancelEdit() {
      this.content = this.plant.care_notes;
      this.editMode = false;
    },
    updateNotes() {
      this.plant.care_notes = this.editor.getHTML();
      this.axios.put(`plant/${this.plant.id}`, this.plant).then(() => {
        this.notify('Plant Notes Updated!');
        this.editMode = false;
      });
    },
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(() => {
        this.$refs.linkInput.focus();
      });
    },
    hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    setLinkUrl(command, url) {
      if (url) {
        var prefix = 'http://';
        if (url.substr(0, prefix.length) !== prefix) {
          url = prefix + url;
        }
      }

      command({ href: url });
      this.hideLinkMenu();
    },
  },
  mounted() {
    this.content = this.plant.care_notes;
    this.editor = new Editor({
      editable: false,
      extensions: [
        new BulletList(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new Link(),
        new Bold(),
        new Italic(),
        new Underline(),
        new History(),
      ],
      content: this.content,
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
$color-black: #0000;
$color-white: #ffffff;
.menubar__button {
  font-weight: 700;
  display: -webkit-inline-box;
  display: inline-flex;
  background: transparent;
  border: 0;
  color: #000;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
}
.menubar__button > i::before {
  color: black;
}
.ProseMirror-focused {
  outline: none;
}

.menububble {
  background-color: black;
  position: absolute;
  display: flex;
  z-index: 20;
  border-radius: 5px;
  background-color: black;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  &__button {
    display: inline-flex;
    background: transparent;
    border: 0;
    color: $color-white;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: rgba($color-white, 0.1);
    }

    &.is-active {
      background-color: rgba($color-white, 0.2);
    }
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    font: inherit;
    outline: none;
    border: none;
    background: transparent;
    color: $color-white;
  }
}
</style>
