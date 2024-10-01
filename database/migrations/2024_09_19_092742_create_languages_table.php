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
        Schema::create('languages', function (Blueprint $table) {
            $table->id();
            $table->string('language_name')->nullable()->comment('Language name');
            $table->string('proficiency_level')->nullable()->comment('Level of language proficiency');
            $table->string('certification')->nullable()->comment('Certification related to language proficiency');
            $table->integer('years_of_experience')->nullable()->comment('Years of experience with this language');
            $table->boolean('is_primary')->default(false)->comment('Indicates if it is the primary language for work');
            $table->text('description_fr')->nullable()->comment('Description in French');
            $table->text('description_en')->nullable()->comment('Description in English');
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
        Schema::dropIfExists('languages');
    }
};
