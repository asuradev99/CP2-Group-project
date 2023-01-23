extends Node

var simultaneous_scene = preload("res://main menu or something/gaming.tscn").instance()

func _add_a_scene_manually():
	# This is like autoloading the scene, only
	# it happens after already loading the main scene.
	get_tree().get_root().add_child(simultaneous_scene)


func _on_Button_pressed():
	_add_a_scene_manually() # Replace with function body.
