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
        Schema::create('user_information', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->nullable()->comment('Full name of the user');
            $table->string('phone_number')->nullable()->comment('User\'s phone number');
            $table->date('birth_date')->nullable()->comment('User\'s date of birth');
            $table->string('address_fr')->nullable()->comment('User address in French');
            $table->string('address_en')->nullable()->comment('User address in English');
            $table->string('email_address')->nullable()->comment('User\'s email address');
            $table->string('profile_picture')->nullable()->comment('Profile picture of the user');
            $table->json('social_links')->nullable()->comment('Links to user’s social profiles (e.g., LinkedIn, GitHub)');
            $table->text('bio')->nullable()->comment('Short biography or summary about the user');
            $table->string('portfolio_website')->nullable()->comment('Link to the user\'s personal portfolio website');
            $table->string('github_username')->nullable()->comment('User\'s GitHub username');
            $table->text('resume_fr')->nullable()->comment('Resume in French');
            $table->text('resume_en')->nullable()->comment('Resume in English');
            $table->foreignId('user_id')->constrained()->comment('ID of the user');
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
        Schema::dropIfExists('user__information');
    }
};
