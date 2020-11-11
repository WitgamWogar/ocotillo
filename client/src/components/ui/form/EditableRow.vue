<template>
    <tr>
        <td>
            <v-tooltip v-if="hasTooltipSlot" right>
                <template v-slot:activator="{on}">
                    <strong v-on="on">{{ label }}</strong>
                </template>
                <span><slot name="tooltip"></slot></span>
            </v-tooltip>
            <strong v-else>{{ label }}</strong>
        </td>
        <td>
            <template v-if="!editMode">
                <span class="nl2br">
                    <template v-if="displayValue !== null">{{ displayValue }}</template>
                    <template v-else-if="value !== null">{{ value }}</template>
                    <template v-else>N/A</template>
                </span>
            </template>
            <template v-if="editMode">
                <v-text-field
                        v-if="textFieldTypes.includes(type)"
                        :label="label"
                        v-model="mutatableValue"
                        v-on:input="$emit('input', mutatableValue)"
                        :type="type"
                        :error-messages="errorMessage"
                        :loading="loading"
                        :disabled="disabled"
                ></v-text-field>

                <v-textarea
                        v-if="type === 'textarea'"
                        :label="label"
                        v-model="mutatableValue"
                        v-on:input="$emit('input', mutatableValue)"
                        :type="type"
                        :error-messages="errorMessage"
                        :loading="loading"
                        :disabled="disabled"
                ></v-textarea>

                <v-dialog
                        v-if="type === 'date'"
                        ref="dialog"
                        v-model="showDateModal"
                        :return-value.sync="mutatableValue"
                        persistent
                        width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                                v-model="mutatableValue"
                                :label="label"
                                prepend-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :error-messages="errorMessage"
                                :loading="loading"
                                :disabled="disabled"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                            v-model="mutatableValue"
                            v-on:input="$emit('input', mutatableValue)"
                            :label="label"
                            scrollable
                    >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="cancelDateModal">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog.save(mutatableValue)">OK</v-btn>
                    </v-date-picker>
                </v-dialog>

                <v-select
                        v-if="type === 'select'"
                        :items="selectOptions"
                        :item-text="selectOptionText"
                        :item-value="selectOptionValue"
                        v-model="mutatableValue"
                        v-on:input="$emit('input', mutatableValue)"
                        :label="label"
                        :clearable="selectClearable"
                        :error-messages="errorMessage"
                        :loading="loading"
                        :disabled="disabled"
                ></v-select>

                <v-switch
                    v-if="type === 'checkbox'"
                    v-model="mutatableValue"
                    v-on:change="$emit('input', mutatableValue)"
                    :error-messages="errorMessage"
                    :loading="loading"
                    :disabled="disabled"
                ></v-switch>
            </template>
        </td>
    </tr>
</template>
<script>
    export default {
        props: {
            label: String,
            displayValue: {type: String, default: null},
            value: [String, Object, Boolean, Number, Array],
            type: {type: String, default: 'text'},
            editMode: {type: Boolean, default: false},
            selectOptions: Array,
            selectOptionText: String,
            selectOptionValue: String,
            errorMessage: [String, Array],
            selectClearable: {type: Boolean, default: false},
            loading: {type: Boolean, default: false},
            disabled: {type: Boolean, default: false},
        },
        data () {
            return {
                textFieldTypes: ['text', 'email', 'number'],
                mutatableValue: this.value,
                showDateModal: false,
            }
        },
        methods: {
            cancelDateModal() {
                this.showDateModal = false;
                this.mutatableValue = this.value;
                this.$emit('input', this.value);
            }
        },
        watch: {
            value(newVal) {
                // Vue doesn't let us modify value directly (throws a warning/error)
                // So we have to listen for updates to it and push those changes to mutatableValue
                if (this.mutatableValue !== newVal) {
                    this.mutatableValue = newVal;
                }
            }
        },
        computed: {
            hasTooltipSlot() {
                return !!this.$slots.tooltip;
            }
        }
    }
</script>
