<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // Display a listing of the projects
    function test(Request $request) {
        return response()->json($request);
    }
    public function index()
    {
        $projects = Project::all();
        return response()->json($projects);
    }

    // Show the form for creating a new project
    public function create()
    {
        return view('projects.create');
    }

    // Store a newly created project in storage
    public function store(Request $request)
    {
        $request->validate([
            'title_fr' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'user_id' => 'required|integer',
        ]);

        $project = Project::create($request->all());
        return response()->json($project, 201);
    }

    // Display the specified project
    public function show($id)
    {
        $project = Project::findOrFail($id);
        return response()->json($project);
    }

    // Show the form for editing the specified project
    public function edit($id)
    {
        $project = Project::findOrFail($id);
        return view('projects.edit', compact('project'));
    }

    // Update the specified project in storage
    public function update(Request $request, $id)
    {
        $request->validate([
            'title_fr' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'user_id' => 'required|integer',
        ]);


        $project = Project::findOrFail($id);
        $project->update($request->all());
        return response()->json($project);
    }

    // Remove the specified project from storage
    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return response()->json(null, 204);
    }
}
