import React from "react";
import { Block, Category } from "react-blockly-drawer";
import "./toolbox.css";

const toolbox = [
  <Category name="Logic" colour="#457B9d">
    <Block type="controls_if" />
    <Block type="logic_compare">
      <field name="OP">EQ</field>
    </Block>
    <Block type="logic_operation">
      <field name="OP">AND</field>
    </Block>
    <Block type="logic_negate" />
    <Block type="logic_boolean">
      <field name="BOOL">TRUE</field>
    </Block>
    <Block type="logic_null" />
    <Block type="logic_ternary" />
  </Category>,
  <Category name="Loops" colour="#5ba55b">
    <Block type="controls_repeat_ext">
      <value name="TIMES">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </Block>
    <Block type="controls_whileUntil">
      <field name="MODE">WHILE</field>
    </Block>
    <Block type="controls_for">
      <field name="let" id="7]RumilQTy$NMo`aJv8g">
        i
      </field>
      <value name="FROM">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="TO">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
      <value name="BY">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </Block>
    <Block type="controls_forEach">
      <field name="let" id="3YVXM5T${p5;|s7ig}m9">
        j
      </field>
    </Block>
    <Block type="controls_flow_statements">
      <field name="FLOW">BREAK</field>
    </Block>
  </Category>,
  <Category name="Math" colour="#995ba5">
    <Block type="math_number">
      <field name="NUM">0</field>
    </Block>
    <Block type="math_arithmetic">
      <field name="OP">ADD</field>
      <value name="A">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="B">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </Block>
    <Block type="math_single">
      <field name="OP">ROOT</field>
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">9</field>
        </shadow>
      </value>
    </Block>
    <Block type="math_trig">
      <field name="OP">SIN</field>
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">45</field>
        </shadow>
      </value>
    </Block>
    <Block type="math_constant">
      <field name="CONSTANT">PI</field>
    </Block>
    <Block type="math_number_property">
      <mutation divisor_input="false" />
      <field name="PROPERTY">EVEN</field>
      <value name="NUMBER_TO_CHECK">
        <shadow type="math_number">
          <field name="NUM">0</field>
        </shadow>
      </value>
    </Block>
    <Block type="math_round">
      <field name="OP">ROUND</field>
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">3.1</field>
        </shadow>
      </value>
    </Block>
    <Block type="math_on_list">
      <mutation op="SUM" />
      <field name="OP">SUM</field>
    </Block>
    <Block type="math_modulo">
      <value name="DIVIDEND">
        <shadow type="math_number">
          <field name="NUM">64</field>
        </shadow>
      </value>
      <value name="DIVISOR">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </Block>
    <Block type="math_constrain">
      <value name="VALUE">
        <shadow type="math_number">
          <field name="NUM">50</field>
        </shadow>
      </value>
      <value name="LOW">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="HIGH">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
    </Block>
    <Block type="math_random_int">
      <value name="FROM">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="TO">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
    </Block>
    <Block type="math_random_float" />
  </Category>,
  <Category name="Text" colour="#f96a20">
    <Block type="text">
      <field name="TEXT" />
    </Block>
    <Block type="text_join">
      <mutation items="2" />
    </Block>
    <Block type="text_append">
      <field name="let" id="5I5C-TPE^HkTz2L72*RR">
        item
      </field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT" />
        </shadow>
      </value>
    </Block>
    <Block type="text_length">
      <value name="VALUE">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </Block>
    <Block type="text_isEmpty">
      <value name="VALUE">
        <shadow type="text">
          <field name="TEXT" />
        </shadow>
      </value>
    </Block>
    <Block type="text_indexOf">
      <field name="END">FIRST</field>
      <value name="VALUE">
        <Block type="variables_get">
          <field name="let" id="nq(339~y143?xTzU~wHS">
            text
          </field>
        </Block>
      </value>
      <value name="FIND">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </Block>
    <Block type="text_charAt">
      <mutation at="true" />
      <field name="WHERE">FROM_START</field>
      <value name="VALUE">
        <Block type="variables_get">
          <field name="let" id="nq(339~y143?xTzU~wHS">
            text
          </field>
        </Block>
      </value>
    </Block>
    <Block type="text_getSubstring">
      <mutation at1="true" at2="true" />
      <field name="WHERE1">FROM_START</field>
      <field name="WHERE2">FROM_START</field>
      <value name="STRING">
        <Block type="variables_get">
          <field name="let" id="nq(339~y143?xTzU~wHS">
            text
          </field>
        </Block>
      </value>
    </Block>
    <Block type="text_changeCase">
      <field name="CASE">UPPERCASE</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </Block>
    <Block type="text_trim">
      <field name="MODE">BOTH</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </Block>
  </Category>,
  <Category name="Misc" colour="#2d728f">
    <Block type="getDateMilliseconds" />
    <Block type="getDateFromMilliseconds" />
    <Block type="trycatch" />
    <Block type="includes" />
    <Block type="stringToInt" />
    <Block type="intToString" />
  </Category>,
  <Category name="Variables" colour="#8cd3fd" custom="VARIABLE" />,
  <Category name="Custom Functions" colour="#c1292e" custom="PROCEDURE" />
];

export default toolbox;
