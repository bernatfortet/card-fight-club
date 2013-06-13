class Counter extends Spine.Model
	@configure 'Counter', 'id', 'number', "attached_card_id", "controller"

	@include
		setNumber: ( number ) ->
			this.number = number
			this.save()

		setController: ( counterController ) ->
			this.controller = counterController
			this.save()

#On Update, reload trigger render