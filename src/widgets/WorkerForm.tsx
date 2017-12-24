import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { TypedTargetEvent } from '@dojo/widget-core/interfaces';
// import { v, w } from '@dojo/widget-core/d';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import Button from '@dojo/widgets/button/Button';
import TextInput from '@dojo/widgets/textinput/TextInput';
import * as css from '../styles/workerForm.css';
import { tsx } from '@dojo/widget-core//tsx';

export interface WorkerFormData {
	firstName: string;
	lastName: string;
	email: string;
}

export interface WorkerFormProperties {
	formData: Partial<WorkerFormData>;
	onFormInput: (data: Partial<WorkerFormData>) => void;
	onFormSave: () => void;
}

export const WorkerFormBase = ThemedMixin(WidgetBase);

@theme(css)
export default class WorkerForm extends WorkerFormBase<WorkerFormProperties> {

	private _onSubmit(event: Event) {
		event.preventDefault();
		this.properties.onFormSave();
	}

	protected onFirstNameInput({ target: { value: firstName } }: TypedTargetEvent<HTMLInputElement>) {
		this.properties.onFormInput({ firstName });
	}

	protected onLastNameInput({ target: { value: lastName } }: TypedTargetEvent<HTMLInputElement>) {
		this.properties.onFormInput({ lastName });
	}

	protected onEmailInput({ target: { value: email } }: TypedTargetEvent<HTMLInputElement>) {
		this.properties.onFormInput({ email });
	}

	protected render() {
		const {
			formData: { firstName, lastName, email }
		} = this.properties;

		return (
			<div classes={this.theme(css.workerForm)}>
				<h1>Add New Worker</h1>
				<form onsubmit={this._onSubmit}>
					<fieldset classes={this.theme(css.nameField)}>
						<legend classes={this.theme(css.nameLabel)}>Name</legend>
						<TextInput key='firstNameInput' label={{content: 'First Name',hidden: true}}
							placeholder='First name'
							value={firstName}
							required={true}
							onInput={this.onFirstNameInput}></TextInput>
						<TextInput key='lastNameInput' label={{content: 'Last Name',hidden: true}}
							placeholder='last name'
							value={lastName}
							required={true}
							onInput={this.onLastNameInput}></TextInput>
					</fieldset>
					<TextInput type='email' label='Email address'
							// placeholder=''
							value={email}
							required={true}
							onInput={this.onEmailInput}></TextInput>
					<Button>Save</Button>
				</form>
			</div>
		);
		// v('div', { classes: this.theme(css.workerForm) }, [
		// 	v('h1', {}, [ 'Add New Worker' ]),
		// 	v('form', {
		// 		onsubmit: this._onSubmit
		// 	}, [
		// 		v('fieldset', { classes: this.theme(css.nameField) }, [
		// 			v('legend', { classes: this.theme(css.nameLabel) }, [ 'Name' ]),
		// 			w(TextInput, {
		// 				key: 'firstNameInput',
		// 				label: {
		// 					content: 'First Name',
		// 					hidden: true
		// 				},
		// 				placeholder: 'First name',
		// 				value: firstName,
		// 				required: true,
		// 				onInput: this.onFirstNameInput
		// 			}),
		// 			w(TextInput, {
		// 				key: 'lastNameInput',
		// 				label: {
		// 					content: 'Last Name',
		// 					hidden: true
		// 				},
		// 				placeholder: 'Last name',
		// 				value: lastName,
		// 				required: true,
		// 				onInput: this.onLastNameInput
		// 			})
		// 		]),
		// 		w(TextInput, {
		// 			label: 'Email address',
		// 			type: 'email',
		// 			value: email,
		// 			required: true,
		// 			onInput: this.onEmailInput
		// 		}),
		// 		w(Button, { }, [ 'Save' ])
		// 	])
		// ]);
	}
}