<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) { 
            $table->id();
            $table->string('title_fr')->nullable()->comment('Project title in French');
            $table->string('title_en')->nullable()->comment('Project title in English');
            $table->text('description_fr')->nullable()->comment('Project description in French');
            $table->text('description_en')->nullable()->comment('Project description in English');
            $table->string('image_path')->nullable()->comment('Path to project image');
            $table->string('video_url')->nullable()->comment('URL to project video');
            $table->string('project_link')->nullable()->comment('Link to the project');
            $table->json('tags')->nullable()->comment('Tags or categories related to the project');
            $table->string('status')->nullable()->comment('Status of the project (e.g., In Progress, Completed)');
            $table->json('technologies_used')->nullable()->comment('List of technologies used in the project');
            $table->string('repository_link')->nullable()->comment('Link to source code repository');
            $table->string('client_name')->nullable()->comment('Client name for whom the project was built');
            $table->foreignId('user_id')->constrained()->comment('ID of the project owner');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
};
