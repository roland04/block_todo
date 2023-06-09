// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Todo list reactive component.
 *
 * @module     block_todo/main
 * @copyright  2023 Mikel Martín <mikel@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {BaseComponent} from 'core/reactive';
import {todoReactive} from 'block_todo/local/todo';

export default class extends BaseComponent {
    /**
     * Create the todo list component.
     */
    create() {
        this.name = 'todolist-app';
        this.selectors = {
            TODOLIST: `[data-for='todo-list-wrapper']`,
        };
    }

    /**
     * Create a component instance from the mustache template.
     *
     * @param {string} target the DOM main element selector
     * @param {object} selectors optional css selector overrides
     * @return {Component}
     */
    static init(target, selectors) {
        return new this({
            element: document.querySelector(target),
            reactive: todoReactive,
            selectors,
        });
    }

    /**
     * Initial state ready method.
     *
     * @param {object} state the initial state
     */
    stateReady(state) {
        this._loadTodoApp({state});
    }

    /**
     * Load the Todo app component.
     *
     * @param {object} param
     * @param {object} param.state the state object
     */
    async _loadTodoApp({state}) {
        // Load TODO list initial state.
        const data = {
            todos: [],
        };
        state.todos.forEach(todo => {
            data.todos.push({...todo});
        });
        data.hastodos = (data.todos.length > 0);

        // Render the component.
        const todoListContainer = this.getElement(this.selectors.TODOLIST);
        if (!todoListContainer) {
            throw new Error('Missing todo-list-wrapper container.');
        }
        await this.renderComponent(todoListContainer, 'block_todo/local/todolist', data);
    }
}
