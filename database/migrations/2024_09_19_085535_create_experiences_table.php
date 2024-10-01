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
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('company_name')->nullable()->comment('Name of the company');
            $table->string('role')->nullable()->comment('Job title or role');
            $table->text('role_description_fr')->nullable()->comment('Role description in French');
            $table->text('role_description_en')->nullable()->comment('Role description in English');
            $table->string('address_fr')->nullable()->comment('Company address in French');
            $table->string('address_en')->nullable()->comment('Company address in English');
            $table->date('start_date')->nullable()->comment('Start date of the role');
            $table->date('end_date')->nullable()->comment('End date of the role');
            $table->boolean('is_current')->default(false)->comment('Indicates if the user is currently employed');
            $table->string('company_website')->nullable()->comment('Company website');
            $table->json('skills_acquired')->nullable()->comment('List of skills acquired during the role');
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
        Schema::dropIfExists('experiences');
    }
};
