<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    // Display a listing of the languages
    public function index()
    {
        $languages = Language::all();
        return response()->json($languages);
    }

    // Show the form for creating a new language
    public function create()
    {
        return view('languages.create');
    }

    // Store a newly created language in storage
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'user_id' => 'required|integer',
        ]);

        $language = Language::create($validated);
        return response()->json($language, 201);
    }

    // Display the specified language
    public function show($id)
    {
        $language = Language::findOrFail($id);
        return response()->json($language);
    }

    // Show the form for editing the specified language
    public function edit($id)
    {
        $language = Language::findOrFail($id);
        return view('languages.edit', compact('language'));
    }

    // Update the specified language in storage
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'user_id' => 'required|integer',
        ]);

        $language = Language::findOrFail($id);
        $language->update($validated);
        return response()->json($language);
    }

    // Remove the specified language from storage
    public function destroy($id)
    {
        $language = Language::findOrFail($id);
        $language->delete();
        return response()->json(null, 204);
    }
}

